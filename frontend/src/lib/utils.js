// export function formatMessageTime(date) {
//     return new Date(date).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//   }
export const formatMessageTime = (timestamp) => {
  if (!timestamp) return "Invalid date";
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleTimeString();
};
