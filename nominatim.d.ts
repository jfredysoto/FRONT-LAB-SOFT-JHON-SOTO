declare module 'nominatim' {
  function search(query: string): Promise<any>;
}
