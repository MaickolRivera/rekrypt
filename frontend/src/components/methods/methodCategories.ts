interface MethodCategory {
  name: string,
  methods: string[]
}

const CATEGORIES: { name: string; match: RegExp }[] = [
  { name: "Hashing", match: /^(SHA|MD5|BLAKE)/ },
  { name: "Encoding", match: /^(HEX|BASE_\d+|BINARY|UUNCODE|URL)$/ },
  { name: "Checksums", match: /^CRC/ },
  { name: "Ciphers & Text", match: /^(ROT_|REVERSE)/ },
];

const OTHER = "Other";

export const groupByCategory = (methods:string[]): MethodCategory[] =>{
  const groups = new Map<string, string[]>();

  for(const method of methods){
    const category = CATEGORIES.find((c)=> c.match.test(method))?.name ?? OTHER;
    const group = groups.get(category);
    if (group) group.push(method);
    else groups.set(category, [method]) 
  }

  const order = [...CATEGORIES.map((c) => c.name), OTHER];
  return order.filter((name)=> groups.has(name))
              .map((name)=> ({name, methods: groups.get(name)!}))
}