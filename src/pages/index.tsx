// pages/index.tsx
import { Containers, Widgets } from "@/components";

export default function MainPage() {
  return (
    <Containers.Layout>
      <Containers.Section el={<Widgets.Hero fullHeight />} />
      <Containers.Section el={<Widgets.Itinerary />} />

    </Containers.Layout>
  );
}
