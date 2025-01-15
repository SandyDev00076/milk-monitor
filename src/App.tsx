import AddCollection from "./components/AddCollection";
import Collections from "./components/Collections";
import Tip from "./components/Tip";
import Title from "./components/Title";
import CollectionProvider from "./context/CollectionContext";

export default function App() {
  return (
    <CollectionProvider>
      <section className=" min-h-screen px-0 lg:px-[20%]">
        <Title />
        <Tip />
        <AddCollection />
        <Collections />
      </section>
    </CollectionProvider>
  );
}
