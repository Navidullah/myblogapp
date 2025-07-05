import CardList from "./components/cardlist/CardList";
import CategoryList from "./components/categorylist/CategoryList";
import Featured from "./components/featured/Featured";
import HearoPage from "./components/hero/Hero";
import Menu from "./components/menu/Menu";

export default async function Home() {
  return (
    <div>
      <HearoPage />
      <Featured />
      <CategoryList />
      <div>
        <CardList />
        <Menu />
      </div>
    </div>
  );
}
