import { getUser, getUserClubs } from "@/app/actions";
import { Unauthorized } from "@/components/Misc/Unauthorized";
import { UserClub } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  noclub: React.ReactNode;
  hasclub: React.ReactNode;
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "ARAM-AZ | User Profile",
  description: "User profile page. Here you can edit the champions you have played for each club.",
};

export default async function Layout({ children, noclub, hasclub, params }: Props) {
  const { user } = await getUser();
  let userClubs: UserClub[] | null = null;

  if (!user) {
    redirect("/login");
  } else if (user && user.id !== params.id) {
    return <Unauthorized />;
  } else {
    const { data } = await getUserClubs(user.id);
    if (data) {
      userClubs = data;
    }
  }

  return (
    <>
      {children}
      {userClubs && userClubs.length === 0 && noclub}
      {userClubs && userClubs.length > 0 && hasclub}
    </>
  );
}
