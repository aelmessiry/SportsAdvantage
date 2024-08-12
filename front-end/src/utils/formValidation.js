import { CLPublicKey } from 'casper-js-sdk';
export function isValidCasperWallet(publicKey) {
  try {
    return CLPublicKey.fromHex(publicKey) instanceof CLPublicKey;
  } catch (error) {
    return false;
  }
}
export function isValidEmail(email) {
  try {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  } catch (error) {
    return false;
  }
}
export function isValidURL(url) {
  try {
    return /^(?:http|https?):\/\/(?:www\.)?(?:[\w-]+\.)+[a-z]{2,}$/i.test(url);
  } catch (error) {
    return false;
  }
}
export function isValidYear(year, min, max) {
  if (Number.isInteger(year)) {
    return year >= min && year <= max;
  }
  return false;
}
export function isContainsLetters(text) {
  // Regular expression to check if the text contains at least one letter
  var letterRegex = /[a-zA-Z]/;
  return letterRegex.test(text);
}
export function isValidFacebookUrl(url) {
  // Regular expression for a basic Facebook profile or page URL
  var facebookUrlRegex =
    /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9.-]+\/?$/;
  return facebookUrlRegex.test(url);
}
export function isValidInstagramUrl(url) {
  // Regular expression for a basic Instagram profile URL
  var instagramUrlRegex =
    /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/;
  return instagramUrlRegex.test(url);
}
export function isValidYouTubeUrl(url) {
  // Regular expression for a basic YouTube video or channel URL
  var youtubeUrlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?[a-zA-Z0-9_-]+|youtu\.be\/[a-zA-Z0-9_-]+)\/?$/;
  return youtubeUrlRegex.test(url);
}
export function isValidTwitterUrl(url) {
  // Regular expression for a basic Twitter profile URL
  var twitterUrlRegex =
    /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/;
  return twitterUrlRegex.test(url);
}
