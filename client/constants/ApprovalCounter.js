export const approvalCounter = "#pragma version 5\n" +
    "txn ApplicationID\n" +
    "int 0\n" +
    "==\n" +
    "bnz main_l18\n" +
    "txn OnCompletion\n" +
    "int OptIn\n" +
    "==\n" +
    "bnz main_l17\n" +
    "txn OnCompletion\n" +
    "int CloseOut\n" +
    "==\n" +
    "bnz main_l16\n" +
    "txn OnCompletion\n" +
    "int UpdateApplication\n" +
    "==\n" +
    "bnz main_l15\n" +
    "txn OnCompletion\n" +
    "int DeleteApplication\n" +
    "==\n" +
    "bnz main_l14\n" +
    "txn OnCompletion\n" +
    "int NoOp\n" +
    "==\n" +
    "bnz main_l7\n" +
    "err\n" +
    "main_l7:\n" +
    "global GroupSize\n" +
    "int 1\n" +
    "==\n" +
    "txna ApplicationArgs 0\n" +
    "byte \"Add\"\n" +
    "==\n" +
    "&&\n" +
    "bnz main_l13\n" +
    "global GroupSize\n" +
    "int 1\n" +
    "==\n" +
    "txna ApplicationArgs 0\n" +
    "byte \"Deduct\"\n" +
    "==\n" +
    "&&\n" +
    "bnz main_l10\n" +
    "err\n" +
    "main_l10:\n" +
    "byte \"Count\"\n" +
    "app_global_get\n" +
    "store 0\n" +
    "load 0\n" +
    "int 0\n" +
    ">\n" +
    "bnz main_l12\n" +
    "main_l11:\n" +
    "int 1\n" +
    "return\n" +
    "main_l12:\n" +
    "byte \"Count\"\n" +
    "load 0\n" +
    "int 1\n" +
    "-\n" +
    "app_global_put\n" +
    "b main_l11\n" +
    "main_l13:\n" +
    "byte \"Count\"\n" +
    "app_global_get\n" +
    "store 0\n" +
    "byte \"Count\"\n" +
    "load 0\n" +
    "int 1\n" +
    "+\n" +
    "app_global_put\n" +
    "int 1\n" +
    "return\n" +
    "main_l14:\n" +
    "int 0\n" +
    "return\n" +
    "main_l15:\n" +
    "int 0\n" +
    "return\n" +
    "main_l16:\n" +
    "int 0\n" +
    "return\n" +
    "main_l17:\n" +
    "int 0\n" +
    "return\n" +
    "main_l18:\n" +
    "byte \"Count\"\n" +
    "int 0\n" +
    "app_global_put\n" +
    "int 1\n" +
    "return"