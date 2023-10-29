export default function getTotalString(total) {
  return `${total.toString().slice(0, -3)} ${total.toString().slice(-3)}`
}
