import { Jwt } from './interfacies';

export default function jwtParce(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(base64) as Jwt;
}