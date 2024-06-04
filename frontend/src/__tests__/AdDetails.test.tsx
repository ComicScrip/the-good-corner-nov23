import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AdDetais from "../pages/ads/[id]";
import { MockedProvider } from "@apollo/client/testing";
import mockRouter from "next-router-mock";
import {
  adDetailsMock,
  adminUserMock,
  categoriesMock,
  visitor2UserMock,
  visitorUserMock,
} from "./graphQLMocks";

describe("AdDetais", () => {
  const ad = adDetailsMock.result.data.getAdById;
  mockRouter.push("/ads/1?id=1");

  const renderAdDetails = (mocks: any[]) =>
    render(
      <MockedProvider mocks={mocks}>
        <AdDetais />
      </MockedProvider>
    );

  it("renders the ad's main info", async () => {
    renderAdDetails([adDetailsMock, adminUserMock, categoriesMock]);
    expect(await screen.findByText("Chargement...")).toBeInTheDocument();
    expect(await screen.findByText(ad.title)).toBeInTheDocument();
    expect(await screen.findByText(ad.location)).toBeInTheDocument();
    expect(await screen.findByText(ad.owner.nickname)).toBeInTheDocument();
    expect(await screen.findByText(ad.description)).toBeInTheDocument();
  });

  it("shows delete and edit button with non-admin profile owner of the ad", async () => {
    renderAdDetails([adDetailsMock, categoriesMock, visitorUserMock]);
    expect(await screen.findByText(/.*Editer.*/)).toBeInTheDocument();
    expect(await screen.findByText(/.*Supprimer.*/)).toBeInTheDocument();
  });

  it("shows delete and edit button with admin profile", async () => {
    renderAdDetails([adDetailsMock, categoriesMock, adminUserMock]);
    expect(await screen.findByText(/.*Editer.*/)).toBeInTheDocument();
    expect(await screen.findByText(/.*Supprimer.*/)).toBeInTheDocument();
  });

  it("does not show delete and edit button with non-admin and non-owner of the ad", async () => {
    renderAdDetails([adDetailsMock, categoriesMock, visitor2UserMock]);
    // wait for the ad infos to appear on screen before checking buttons inside
    expect(await screen.findByText(ad.title)).toBeInTheDocument();
    expect(await screen.queryByTestId("deleteAdBtn")).toBeNull();
    expect(await screen.queryByTestId("editAdBtn")).toBeNull();
  });
});
