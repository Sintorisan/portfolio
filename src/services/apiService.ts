export async function getBloggs(): Promise<Blogg[]> {
  const res = await fetch("/data/bloggs.json");
  return res.json();
}
