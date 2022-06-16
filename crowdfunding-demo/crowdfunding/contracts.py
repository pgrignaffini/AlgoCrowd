from pyteal import *

PLATFORM_FEE = Int(5_000)  # 0.05 Algo


def approval_program():

    creator_key = Bytes("creator")
    goal_amount_key = Bytes("goal")
    total_funded_key = Bytes("total_funded")
    algocrowd_key = Bytes("algocrowd")

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

    # *****************************************
    # *************** On Create ***************
    # *****************************************

    on_create = Seq(
        App.globalPut(creator_key, Txn.application_args[0]),
        App.globalPut(goal_amount_key, Btoi(Txn.application_args[1])),
        App.globalPut(total_funded_key, Int(0)),
        App.globalPut(algocrowd_key, Txn.application_args[2]),
        Approve(),
    )

    # *****************************************
    # *************** On Setup ****************
    # *****************************************

    fund_txn_index = Txn.group_index() - Int(1)
    on_setup = Seq(
        Assert(
            And(
                # the setup fund payment is before the app call
                Gtxn[fund_txn_index].type_enum() == TxnType.Payment,
                Gtxn[fund_txn_index].sender() == App.globalGet(creator_key),
                Gtxn[fund_txn_index].receiver() == Global.current_application_address(),
                Gtxn[fund_txn_index].amount()
                >= Global.min_balance() + Global.min_txn_fee(),
            )
        ),
        Approve(),
    )

    # *****************************************
    # *************** On OptIn ****************
    # *****************************************

    on_opt_in = Seq(
        # set local storage for user to zero
        App.localPut(Txn.sender(), Bytes("AmountInvested"), Int(0)),
        Approve(),
    )

    # *****************************************
    # *************** On Fund *****************
    # *****************************************

    fund_txn_index = Txn.group_index() - Int(2)
    fee_txn_index = Txn.group_index() - Int(1)

    on_fund = Seq(
        Assert(
            And(
                # user must have opted-into the application
                App.optedIn(Txn.sender(), Global.current_application_id()),
                # the crowdfunding fund payment is before the app call
                Gtxn[fund_txn_index].type_enum() == TxnType.Payment,
                Gtxn[fund_txn_index].sender() == Txn.sender(),
                Gtxn[fund_txn_index].receiver() == Global.current_application_address(),
                Gtxn[fund_txn_index].amount() >= Global.min_txn_fee(),
                # the crowdfunding fee payment is before the app call
                Gtxn[fee_txn_index].type_enum() == TxnType.Payment,
                Gtxn[fee_txn_index].sender() == Txn.sender(),
                Gtxn[fee_txn_index].receiver() == App.globalGet(algocrowd_key),
                Gtxn[fee_txn_index].amount() >= PLATFORM_FEE,
            )
        ),
        # update application funded amount (previous_funded + (just_funded - fees))
        App.globalPut(
            total_funded_key,
            App.globalGet(total_funded_key) + Gtxn[fund_txn_index].amount(),
        ),
        # update user amount invested
        App.localPut(
            Txn.sender(),
            Bytes("AmountInvested"),
            App.localGet(Txn.sender(), Bytes("AmountInvested"))
            + Gtxn[fund_txn_index].amount(),
        ),
        Approve(),
    )

    # *****************************************
    # *************** On ReFund ***************
    # *****************************************
    on_refund = Seq(
        Assert(
            And(
                # the goal has not been reached
                App.globalGet(total_funded_key) < App.globalGet(goal_amount_key),
                # the user has not already been refunded
                App.localGet(Txn.sender(), Bytes("AmountInvested")) > Int(0),
            )
        ),
        refundUser(Txn.sender(), App.localGet(Txn.sender(), Bytes("AmountInvested"))),
        App.localPut(Txn.sender(), Bytes("AmountInvested"), Int(0)),
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
    # *************** On Delete ***************
    # *****************************************
    on_delete = Seq(
        # sender must be the crowdfunding creator
        Assert(Txn.sender() == App.globalGet(creator_key)),
        # send all the remaining token to the creator
        closeAccountTo(App.globalGet(creator_key)),
        Approve(),
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
