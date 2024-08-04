import Login from "@/components/login";

export type User = {
  email: string,
  name: string
}

export default async function Home() {
  return (
    <div className=" flex justify-center items-center align-middle h-14">
      <form>
        <Login />
      </form>
    </div>
  );
}
