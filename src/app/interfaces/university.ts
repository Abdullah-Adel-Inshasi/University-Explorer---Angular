interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string[];
  'state-province': string | null;
  domains: string[];
}
export default University;
