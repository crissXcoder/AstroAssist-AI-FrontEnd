export type ProductCategory = "Telescopios" | "Monturas" | "Cámaras" | "Accesorios";

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  category: ProductCategory;
}

export const catalogData: CatalogProduct[] = [
  {
    id: "celestron-130slt",
    name: "Celestron NexStar 130SLT",
    description: "Telescopio Newtoniano Computarizado ideal para observadores lunares y planetarios. Seguimiento sideral de alta precisión interconectado.",
    price: "$649.00",
    tags: ["Principiante", "Automático"],
    category: "Telescopios",
    image: "https://imgs.search.brave.com/C6P88nkDHy7hDSlqPytuMrSZUUerV6Kqb50A6oioP3o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXN0cm9ub215Zm9y/YmVnaW5uZXJzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8wMS9DZWxlc3Ry/b24tTmV4U3Rhci0x/MzBTTFQuanBn"
  },
  {
    id: "sw-eq6r",
    name: "Sky-Watcher EQ6-R Pro",
    description: "Montura Ecuatorial Alemana ultra-precisa con tracción por correas. La espina dorsal de la astrofotografía premium de grado observatorio.",
    price: "$2,025.00",
    tags: ["Avanzado", "Precisa"],
    category: "Monturas",
    image: "https://imgs.search.brave.com/ZSohKTGoEpCEjDgpIidX_RAikTxQpwHIBbWMl0Va6Js/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mb3Rv/YXN0cm9nb256YWxl/ei5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjUvMDUvU1cw/Mzk2LTF4MTIwMC0x/LmpwZw"
  },
  {
    id: "zwo-533mc",
    name: "ZWO ASI533MC Pro",
    description: "Sensor CMOS a color con refrigeración termoeléctrica extrema (Peltier) garantizando el mínimo ruido en exposiciones cósmicas ultra-largas.",
    price: "$799.00",
    tags: ["Astrofotografía", "Sensor CMOS"],
    category: "Cámaras",
    image: "https://imgs.search.brave.com/ixCS3wCfNIzK9tZJjrpUjetlHxetaaZBwTwLTjV9dJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90ZWxl/c2NvcGVzLm5ldC9t/ZWRpYS9jYXRhbG9n/L3Byb2R1Y3QvY2Fj/aGUvY2MwZjgwZTk0/N2NjMzY4ZTM0MTA4/MDUzMzdkZWFkZmQv/YS9zL2FzaTUzM21j/LXAtMS5qcGc"
  },
  {
    id: "celestron-edge",
    name: "Celestron EdgeHD 8\"",
    description: "Tubo Óptico avanzado con corrección de coma y campo hiper-plano. Transmisión StarBright XLT para resolución profunda implacable.",
    price: "$1,499.00",
    tags: ["Profesional", "Alta Resolución"],
    category: "Telescopios",
    image: "//www.celestron.com/cdn/shop/products/91030-xlt_edgehd8_large_1.jpg?v=1534172053&width=1445"
  },
  {
    id: "zwo-eaf",
    name: "ZWO EAF Focuser 5V",
    description: "Micro-focalizador electrónico avanzado para ajustes sub-milimétricos de óptica remota sin vibración ambiental inter-fásica.",
    price: "$199.00",
    tags: ["Accesorios", "IA Sync"],
    category: "Accesorios",
    image: "https://imgs.search.brave.com/X_VsgpXsbSqFgHZ84mv36faB6c70hAZxIADZv2IfG5g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YXN0cm9zaG9wLmV1/L1Byb2R1a3RiaWxk/ZXIvem9vbS83MDY2/OF82L1pXTy1FbGVj/dHJvbmljLUF1dG9t/YXRpYy1Gb2N1c2Vy/LUVBRi1TdGFuZGFy/ZC01Vi0uanBn"
  },
  {
    id: "optolong-lpro",
    name: "Optolong L-eXtreme 2\"",
    description: "Filtro de doble banda pasante estricto para Ha y OIII. Perfora cielos fuertemente polucionados (Bortle 8).",
    price: "$309.00",
    tags: ["Banda Estrecha", "Bortle 8"],
    category: "Accesorios",
    image: "https://imgs.search.brave.com/koROv4oldKmlv8wvHrXYE4ug_vMMlSxjbINHt9yLpGQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGVzdGFyLmNvbS5h/dS9jZG4vc2hvcC9w/cm9kdWN0cy9MLWVY/dHJlbWUtU0FJLXNo/YXJwZW4tRGVOb2lz/ZUFJLWRlbm9pc2Uu/cG5nP3Y9MTYxOTMz/OTU1NCZ3aWR0aD0x/MjE0" 
  }
];
