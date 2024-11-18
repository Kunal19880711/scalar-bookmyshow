export function extractErrorMsg(err) {
  return err?.response?.data?.message || err?.message;
}
