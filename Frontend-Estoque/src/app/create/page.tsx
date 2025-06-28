import Link from "next/link";
import FormCreateItem from "./FormCreateItem";
import BackLink from "@/app/components/BackLink"

export default function CreateItemPage() {
  return (
    <main className="p-8">
      <div className="mb-4">
        <BackLink href="/home" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Equipamento</h1>
      <FormCreateItem />
    </main>
  );
}
