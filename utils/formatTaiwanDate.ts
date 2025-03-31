export default (date?: Date) => {
   if (!date) return "未設定";
   const year = date.getFullYear() - 1911; // Republic of China year
   const month = date.getMonth() + 1;
   const day = date.getDate();
   return `${year}年${month}月${day}日`;
};
