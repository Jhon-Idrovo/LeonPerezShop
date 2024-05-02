import NavBar from "@/components/NavBar";
import Image from "next/image";
const products = [
  {
    name: "PD-XUD",
    imageURL:
      "https://media.boohoo.com/i/boohoo/bmm20038_white_xl/male-white-pleated-oversized-t-shirt?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit",
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      {products.map((p, i) => {
        return (
          <div className="" key={i}>
            <Image src={p.imageURL} alt={p.name} width={350} height={600} />
            <h4>{p.name}</h4>
          </div>
        );
      })}
    </main>
  );
}
