import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "@/components/Header";

const DashboardContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <DashboardContainer>
        <h1>Welcome to the Dashboard!</h1>
        <p>You are now logged in.</p>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
