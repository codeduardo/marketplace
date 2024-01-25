import { IoSearch, IoPersonSharp, IoLogOut } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAddToPhotos } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateSession } from "@/redux/features/sessionSlice";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const session = useAppSelector((store) => store.sessionReducer);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        dispatch(updateSession({ session }));
      }
    })();
  }, [dispatch]);

  return (
    <>
      {/* HEADER */}
      <div className="fixed top-0 flex w-full items-center justify-between border-b-2 border-b-black bg-[#fff5bf] px-4 py-3">
        <h1 className={`text-3xl font-bold text-black`}>MAGALY</h1>
        <div className="flex items-center gap-4">
          {session && (
            <Button variant={"secondary"} onClick={() => signOut()}>
              Salir
            </Button>
          )}
          <RxHamburgerMenu
            className="cursor-pointer text-2xl text-black"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
      </div>
      <div
        className={clsx(
          "recipe-container absolute left-0 top-1/2 z-10 flex h-[80vh] w-52 -translate-y-1/2 transform flex-col items-center justify-between px-4 py-8 transition delay-200 ease-in-out",
          {
            "-translate-x-[100%] ": !openMenu,
            "translate-x-4 ": openMenu,
          },
        )}
      >
        <ul className="flex flex-col gap-4">
          <li className="rounded-2xl  px-3 py-2 hover:bg-[#ec95c833]">
            <Link href="/" className="flex items-center gap-2">
              <IoSearch />
              <span className="text-sm">Buscar producto</span>
            </Link>{" "}
          </li>
          {session && (
            <li className="rounded-2xl  px-3 py-2 hover:bg-[#ec95c833]">
              <Link href="/product" className="flex items-center gap-2">
                <MdAddToPhotos />
                <span className="text-sm">Ingresar Producto</span>
              </Link>{" "}
            </li>
          )}

          <li className="rounded-2xl  px-3 py-2 hover:bg-[#ec95c833]">
            <Link href="/auth/login" className="flex items-center gap-2">
              <IoPersonSharp />
              <span className="text-sm">Ingresar </span>
            </Link>{" "}
          </li>
        </ul>
        <div>
          {session && (
            <div className="w-full pb-4">
              <Button onClick={() => signOut()} className="w-full">
                <div className="flex items-center gap-2">
                  <IoLogOut className="text-xl" />
                  Salir
                </div>
              </Button>
            </div>
          )}
          <div className="text-center text-[10px]">
            Hecho por <strong>EduardoJM</strong>
            <span className="block">Política de privacidad y cookies.</span>
          </div>
        </div>
      </div>
      {/* END HEADER */}
    </>
  );
};
