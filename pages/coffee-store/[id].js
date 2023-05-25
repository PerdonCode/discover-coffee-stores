// page needs to be react component
// has to export default

import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
    const router = useRouter();
    console.log("router", router);
 return <div> Coffee store page {router.query.id}
    <Link href="/" scroll={false}> go back to homepage</Link>
    <Link href="/coffee-store/dynamic"> go to page dynamic</Link>
 </div>;
};

export default CoffeeStore;