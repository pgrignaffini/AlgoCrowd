export const approval = "#pragma version 5\n" +
    "txn ApplicationID\n" +
    "int 0\n" +
    "==\n" +
    "bnz main_l18\n" +
    "txn OnCompletion\n" +
    "int NoOp\n" +
    "==\n" +
    "bnz main_l11\n" +
    "txn OnCompletion\n" +
    "int DeleteApplication\n" +
    "==\n" +
    "bnz main_l8\n" +
    "txn OnCompletion\n" +
    "int OptIn\n" +
    "==\n" +
    "bnz main_l7\n" +
    "txn OnCompletion\n" +
    "int CloseOut\n" +
    "==\n" +
    "txn OnCompletion\n" +
    "int UpdateApplication\n" +
    "==\n" +
    "||\n" +
    "bnz main_l6\n" +
    "err\n" +
    "main_l6:\n" +
    "int 0\n" +
    "return\n" +
    "main_l7:\n" +
    "int 0\n" +
    "byte \"AmountInvested\"\n" +
    "txn Note\n" +
    "btoi\n" +
    "app_local_put\n" +
    "int 1\n" +
    "return\n" +
    "main_l8:\n" +
    "global LatestTimestamp\n" +
    "byte \"start\"\n" +
    "app_global_get\n" +
    "<\n" +
    "bnz main_l10\n" +
    "byte \"end\"\n" +
    "app_global_get\n" +
    "global LatestTimestamp\n" +
    "<=\n" +
    "txn Sender\n" +
    "byte \"creator\"\n" +
    "app_global_get\n" +
    "==\n" +
    "&&\n" +
    "assert\n" +
    "byte \"creator\"\n" +
    "app_global_get\n" +
    "callsub closeAccountTo_1\n" +
    "int 1\n" +
    "return\n" +
    "int 0\n" +
    "return\n" +
    "main_l10:\n" +
    "txn Sender\n" +
    "byte \"creator\"\n" +
    "app_global_get\n" +
    "==\n" +
    "txn Sender\n" +
    "global CreatorAddress\n" +
    "==\n" +
    "||\n" +
    "assert\n" +
    "byte \"creator\"\n" +
    "app_global_get\n" +
    "callsub closeAccountTo_1\n" +
    "int 1\n" +
    "return\n" +
    "main_l11:\n" +
    "txna ApplicationArgs 0\n" +
    "byte \"setup\"\n" +
    "==\n" +
    "bnz main_l17\n" +
    "txna ApplicationArgs 0\n" +
    "byte \"fund\"\n" +
    "==\n" +
    "bnz main_l16\n" +
    "txna ApplicationArgs 0\n" +
    "byte \"refund\"\n" +
    "==\n" +
    "bnz main_l15\n" +
    "err\n" +
    "main_l15:\n" +
    "global LatestTimestamp\n" +
    "byte \"end\"\n" +
    "app_global_get\n" +
    ">\n" +
    "byte \"total_funded\"\n" +
    "app_global_get\n" +
    "byte \"goal\"\n" +
    "app_global_get\n" +
    "<\n" +
    "&&\n" +
    "assert\n" +
    "txn Sender\n" +
    "txn Sender\n" +
    "byte \"AmountInvested\"\n" +
    "app_local_get\n" +
    "callsub refundUser_0\n" +
    "int 1\n" +
    "return\n" +
    "main_l16:\n" +
    "byte \"start\"\n" +
    "app_global_get\n" +
    "global LatestTimestamp\n" +
    "<=\n" +
    "global LatestTimestamp\n" +
    "byte \"end\"\n" +
    "app_global_get\n" +
    "<\n" +
    "&&\n" +
    "txn GroupIndex\n" +
    "int 1\n" +
    "-\n" +
    "gtxns TypeEnum\n" +
    "int pay\n" +
    "==\n" +
    "&&\n" +
    "txn GroupIndex\n" +
    "int 1\n" +
    "-\n" +
    "gtxns Sender\n" +
    "txn Sender\n" +
    "==\n" +
    "&&\n" +
    "txn GroupIndex\n" +
    "int 1\n" +
    "-\n" +
    "gtxns Receiver\n" +
    "global CurrentApplicationAddress\n" +
    "==\n" +
    "&&\n" +
    "txn GroupIndex\n" +
    "int 1\n" +
    "-\n" +
    "gtxns Amount\n" +
    "global MinTxnFee\n" +
    ">=\n" +
    "&&\n" +
    "assert\n" +
    "byte \"total_funded\"\n" +
    "byte \"total_funded\"\n" +
    "app_global_get\n" +
    "txn GroupIndex\n" +
    "int 1\n" +
    "-\n" +
    "gtxns Amount\n" +
    "+\n" +
    "global MinTxnFee\n" +
    "-\n" +
    "app_global_put\n" +
    "int 1\n" +
    "return\n" +
    "main_l17:\n" +
    "global LatestTimestamp\n" +
    "byte \"start\"\n" +
    "app_global_get\n" +
    "<\n" +
    "assert\n" +
    "int 1\n" +
    "return\n" +
    "main_l18:\n" +
    "byte \"creator\"\n" +
    "txna ApplicationArgs 0\n" +
    "app_global_put\n" +
    "byte \"start\"\n" +
    "txna ApplicationArgs 1\n" +
    "btoi\n" +
    "app_global_put\n" +
    "byte \"end\"\n" +
    "txna ApplicationArgs 2\n" +
    "btoi\n" +
    "app_global_put\n" +
    "byte \"goal\"\n" +
    "txna ApplicationArgs 3\n" +
    "btoi\n" +
    "app_global_put\n" +
    "byte \"total_funded\"\n" +
    "int 0\n" +
    "app_global_put\n" +
    "global LatestTimestamp\n" +
    "txna ApplicationArgs 1\n" +
    "btoi\n" +
    "<\n" +
    "txna ApplicationArgs 1\n" +
    "btoi\n" +
    "txna ApplicationArgs 2\n" +
    "btoi\n" +
    "<\n" +
    "&&\n" +
    "assert\n" +
    "int 1\n" +
    "return\n" +
    "\n" +
    "// refundUser\n" +
    "refundUser_0:\n" +
    "store 1\n" +
    "store 0\n" +
    "itxn_begin\n" +
    "int pay\n" +
    "itxn_field TypeEnum\n" +
    "load 1\n" +
    "global MinTxnFee\n" +
    "-\n" +
    "itxn_field Amount\n" +
    "load 0\n" +
    "itxn_field Receiver\n" +
    "itxn_submit\n" +
    "retsub\n" +
    "\n" +
    "// closeAccountTo\n" +
    "closeAccountTo_1:\n" +
    "store 2\n" +
    "global CurrentApplicationAddress\n" +
    "balance\n" +
    "int 0\n" +
    "!=\n" +
    "bz closeAccountTo_1_l2\n" +
    "itxn_begin\n" +
    "int pay\n" +
    "itxn_field TypeEnum\n" +
    "load 2\n" +
    "itxn_field CloseRemainderTo\n" +
    "itxn_submit\n" +
    "closeAccountTo_1_l2:\n" +
    "retsub"