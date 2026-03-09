import { redirect } from "next/navigation";

type Props = {
  params: { locale: string };
};

export default function AiToolsIndexPage({ params }: Props) {
  redirect(`/${params.locale}/directory`);
}
