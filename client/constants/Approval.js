export const approval = `#pragma version 5
txn ApplicationID
int 0
==
bnz main_l16
txn OnCompletion
int NoOp
==
bnz main_l9
txn OnCompletion
int DeleteApplication
==
bnz main_l8
txn OnCompletion
int OptIn
==
bnz main_l7
txn OnCompletion
int CloseOut
==
txn OnCompletion
int UpdateApplication
==
||
bnz main_l6
err
main_l6:
int 0
return
main_l7:
txn Sender
byte "AmountInvested"
int 0
app_local_put
int 1
return
main_l8:
txn Sender
byte "creator"
app_global_get
==
assert
byte "creator"
app_global_get
callsub closeAccountTo_1
int 1
return
main_l9:
txna ApplicationArgs 0
byte "setup"
==
bnz main_l15
txna ApplicationArgs 0
byte "fund"
==
bnz main_l14
txna ApplicationArgs 0
byte "refund"
==
bnz main_l13
err
main_l13:
byte "total_funded"
app_global_get
byte "goal"
app_global_get
<
txn Sender
byte "AmountInvested"
app_local_get
int 0
>
&&
assert
txn Sender
txn Sender
byte "AmountInvested"
app_local_get
callsub refundUser_0
txn Sender
byte "AmountInvested"
int 0
app_local_put
int 1
return
main_l14:
txn Sender
global CurrentApplicationID
app_opted_in
txn GroupIndex
int 2
-
gtxns TypeEnum
int pay
==
&&
txn GroupIndex
int 2
-
gtxns Sender
txn Sender
==
&&
txn GroupIndex
int 2
-
gtxns Receiver
global CurrentApplicationAddress
==
&&
txn GroupIndex
int 2
-
gtxns Amount
global MinTxnFee
>=
&&
txn GroupIndex
int 1
-
gtxns TypeEnum
int pay
==
&&
txn GroupIndex
int 1
-
gtxns Sender
txn Sender
==
&&
txn GroupIndex
int 1
-
gtxns Receiver
byte "algocrowd"
app_global_get
==
&&
txn GroupIndex
int 1
-
gtxns Amount
int 5000
>=
&&
assert
byte "total_funded"
byte "total_funded"
app_global_get
txn GroupIndex
int 2
-
gtxns Amount
+
app_global_put
txn Sender
byte "AmountInvested"
txn Sender
byte "AmountInvested"
app_local_get
txn GroupIndex
int 2
-
gtxns Amount
+
app_local_put
int 1
return
main_l15:
txn GroupIndex
int 1
-
gtxns TypeEnum
int pay
==
txn GroupIndex
int 1
-
gtxns Sender
byte "creator"
app_global_get
==
&&
txn GroupIndex
int 1
-
gtxns Receiver
global CurrentApplicationAddress
==
&&
txn GroupIndex
int 1
-
gtxns Amount
global MinBalance
global MinTxnFee
+
>=
&&
assert
int 1
return
main_l16:
byte "creator"
txna ApplicationArgs 0
app_global_put
byte "goal"
txna ApplicationArgs 1
btoi
app_global_put
byte "total_funded"
int 0
app_global_put
byte "algocrowd"
txna ApplicationArgs 2
app_global_put
int 1
return

// refundUser
refundUser_0:
store 1
store 0
itxn_begin
int pay
itxn_field TypeEnum
load 1
global MinTxnFee
-
itxn_field Amount
load 0
itxn_field Receiver
itxn_submit
retsub

// closeAccountTo
closeAccountTo_1:
store 2
global CurrentApplicationAddress
balance
int 0
!=
bz closeAccountTo_1_l2
itxn_begin
int pay
itxn_field TypeEnum
load 2
itxn_field CloseRemainderTo
itxn_submit
closeAccountTo_1_l2:
retsub
`