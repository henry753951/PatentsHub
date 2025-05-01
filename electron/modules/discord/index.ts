import { DeleteBackupAction } from "./actions/deleteBackup";
import { GetBackupsAction } from "./actions/getBackups";
import { GetCurrentDBInfoAction } from "./actions/getCurrentDBInfo";
import { PingAction } from "./actions/ping";
import { CreateBackupAction } from "./actions/createBackup";
import { DatabaseCommand } from "./commands/database";
import { MessageCommand } from "./commands/message";
import { PingCommand } from "./commands/ping";
import { UseBackupAction } from "./actions/useBackup";

export const events = {
   commandEvents: [PingCommand, DatabaseCommand, MessageCommand],
   actionEvents: {
      ping: PingAction,
      getCurrentDBInfo: GetCurrentDBInfoAction,
      getBackups: GetBackupsAction,
      deleteBackup: DeleteBackupAction,
      createBackup: CreateBackupAction,
      useBackup: UseBackupAction,
   },
} as const;
