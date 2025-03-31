import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
export default (date: Date) => format(date, "PPP", { locale: zhTW });
