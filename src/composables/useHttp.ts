import { getCurrentInstance } from "vue";

export function useHttp() {
  const instance = getCurrentInstance();
  if (!instance) throw new Error("No Vue instance found");
  return {
    $http_post: instance.proxy!.$http_post,
  };
}
