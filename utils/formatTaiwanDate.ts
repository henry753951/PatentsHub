export default (date?: Date, formatStr: string = "YY 年 MM 月 DD 日") => {
   if (!date) return "未設定";
   const year = date.getFullYear() - 1911; // Republic of China year
   const month = date.getMonth() + 1;
   const day = date.getDate();

   return formatStr
      .replace(/YY/g, year.toString())
      .replace(/yy/g, year.toString().slice(-2))
      .replace(/MM/g, month.toString().padStart(2, "0"))
      .replace(/DD/g, day.toString().padStart(2, "0"))
      .replace(/M/g, month.toString())
      .replace(/D/g, day.toString());
};
