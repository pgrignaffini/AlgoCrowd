from pyteal import *


def approval_program():
    creator_key = Bytes("creator")
    start_time_key = Bytes("start")
    end_time_key = Bytes("end")
    goal_amount_key = Bytes("goal")
    total_funded_key = Bytes("total_funded")

    @Subroutine(TealType.none)
    def refundUser(account: Expr, amount: Expr) -> Expr:
        return Seq(
            InnerTxnBuilder.Begin(),
            InnerTxnBuilder.SetFields(
                {
                    TxnField.type_enum: TxnType.Payment,
                    TxnField.amount: amount - Global.min_txn_fee(),
                    TxnField.receiver: account,
                }
            ),
            InnerTxnBuilder.Submit(),
        )

    @Subroutine(TealType.none)
    def closeAccountTo(account: Expr) -> Expr:
        return If(Balance(Global.current_application_address()) != Int(0)).Then(
            Seq(
                InnerTxnBuilder.Begin(),
                InnerTxnBuilder.SetFields(
                    {
                        TxnField.type_enum: TxnType.Payment,
                        TxnField.close_remainder_to: account,
                    }
                ),
                InnerTxnBuilder.Submit(),
            )
        )

    # Provided values when sending tx:
    # app_args = [
    #     encoding.decode_address(creator), [0]
    #     startTime.to_bytes(8, "big"), [1]
    #     endTime.to_bytes(8, "big"), [2]
    #     goal.to_bytes(8, "big"), [3]
    # ]

    # *****************************************
    # *************** On Create ***************
    # *****************************************
    on_create_start_time = Btoi(Txn.application_args[1])

    on_create_end_time = Btoi(Txn.application_args[2])

    on_create = Seq(
        App.globalPut(creator_key, Txn.application_args[0]),
        App.globalPut(start_time_key, on_create_start_time),
        App.globalPut(end_time_key, on_create_end_time),
        App.globalPut(goal_amount_key, Btoi(Txn.application_args[3])),
        App.globalPut(total_funded_key, Int(0)),
        Assert(
            And(
                Global.latest_timestamp() < on_create_start_time,
                on_create_start_time < on_create_end_time,
            )
        ),
        Approve(),
    )



    # *****************************************
    # *************** On Setup ****************
    # *****************************************
    on_setup = Seq(
        # the crowdfunding hasn't started yet
        Assert(Global.latest_timestamp() < App.globalGet(start_time_key)),
        Approve(),
    )



    # *****************************************
    # *************** On Fund *****************
    # *****************************************
    on_fund_txn_index = Txn.group_index() - Int(1)

    on_fund = Seq(
        Assert(
            And(
                # the crowdfunding has started
                App.globalGet(start_time_key) <= Global.latest_timestamp(),
                # the crowdfunding has not ended
                Global.latest_timestamp() < App.globalGet(end_time_key),
                # the crowdfunding fund payment is before the app call
                Gtxn[on_fund_txn_index].type_enum() == TxnType.Payment,
                Gtxn[on_fund_txn_index].sender()    == Txn.sender(),
                Gtxn[on_fund_txn_index].receiver()  == Global.current_application_address(),
                Gtxn[on_fund_txn_index].amount()    >= Global.min_txn_fee(),
            )
        ),
        # update application funded amount (previous_funded + (just_funded - fees))
        App.globalPut(
            total_funded_key,
            App.globalGet(total_funded_key) + Gtxn[on_fund_txn_index].amount() - Global.min_txn_fee(),
        ),
        Approve(),
    )
  
    
    # *****************************************
    # *************** On ReFund ***************
    # *****************************************
    on_refund = Seq(
        Assert(
            And(
                # the crowdfunding has ended
                Global.latest_timestamp() > App.globalGet(end_time_key),
                # the goal has not been reached
                App.globalGet(total_funded_key) < App.globalGet(goal_amount_key),
            ),
        ),
        refundUser(Txn.sender(), App.localGet(Txn.sender(), Bytes("AmountInvested"))),
        Approve(),
    )

    

    # *****************************************
    # *************** On Call *****************
    # *****************************************
    on_call_method = Txn.application_args[0]

    on_call = Cond(
        [on_call_method == Bytes("setup"), on_setup],
        [on_call_method == Bytes("fund"), on_fund],
        [on_call_method == Bytes("refund"), on_refund],
    )

    

    # *****************************************
    # *************** On OptIn ****************
    # *****************************************
    on_opt_in = Seq(
        App.localPut(Int(0), Bytes("AmountInvested"), Btoi(Txn.note())),
        Approve(),
    )

    

    # *****************************************
    # *************** On Delete ***************
    # *****************************************
    on_delete = Seq(
        If(Global.latest_timestamp() < App.globalGet(start_time_key)).Then(
            # the crowdfunding has not yet started, it's ok to delete
            Seq(
                Assert(
                    Or(
                        # sender must either be the seller or the auction creator
                        Txn.sender() == App.globalGet(creator_key),
                        Txn.sender() == Global.creator_address(),
                    )
                ),
                # if the crowdfunding contract still has funds, send them all to the creator
                closeAccountTo(App.globalGet(creator_key)),
                Approve(),
            )
        ),
        Seq(
            Assert(
                And(
                    # the crowdfunding is over
                    App.globalGet(end_time_key) <= Global.latest_timestamp(),
                    # sender is the creator
                    Txn.sender() == App.globalGet(creator_key),
                )
            ),
            closeAccountTo(App.globalGet(creator_key)),
            Approve(),
        ),
        Reject(),
    )

    # ***************************************************

    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_call],
        [Txn.on_completion() == OnComplete.DeleteApplication, on_delete],
        [Txn.on_completion() == OnComplete.OptIn, on_opt_in],
        [   
            Or(
                Txn.on_completion() == OnComplete.CloseOut,
                Txn.on_completion() == OnComplete.UpdateApplication,
            ), 
            Reject(),
        ],
    )

    return program


def clear_state_program():
    return Approve()


if __name__ == "__main__":
    with open("crowdfunding_approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)

    with open("crowdfunding_clear_state.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)
