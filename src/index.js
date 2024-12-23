import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePageOne from "./pages/HomePageOne";
import HomePageTwo from "./pages/HomePageTwo";
import HomePageThree from "./pages/HomePageThree";
import HomePageFour from "./pages/HomePageFour";
import HomePageFive from "./pages/HomePageFive";
import HomePageSix from "./pages/HomePageSix";
import HomePageSeven from "./pages/HomePageSeven";
import EmailPage from "./pages/EmailPage";
import AddUserPage from "./pages/AddUserPage";
import AlertPage from "./pages/AlertPage";
import AssignRolePage from "./pages/AssignRolePage";
import AvatarPage from "./pages/AvatarPage";
import BadgesPage from "./pages/BadgesPage";
import ButtonPage from "./pages/ButtonPage";
import CalendarMainPage from "./pages/CalendarMainPage";
import CardPage from "./pages/CardPage";
import CarouselPage from "./pages/CarouselPage";
import ChatEmptyPage from "./pages/ChatEmptyPage";
import ChatMessagePage from "./pages/ChatMessagePage";
import ChatProfilePage from "./pages/ChatProfilePage";
import CodeGeneratorNewPage from "./pages/CodeGeneratorNewPage";
import CodeGeneratorPage from "./pages/CodeGeneratorPage";
import ColorsPage from "./pages/ColorsPage";
import ColumnChartPage from "./pages/ColumnChartPage";
import CompanyPage from "./pages/CompanyPage";
import CurrenciesPage from "./pages/CurrenciesPage";
import DropdownPage from "./pages/DropdownPage";
import ErrorPage from "./pages/ErrorPage";
import FaqPage from "./pages/FaqPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FormLayoutPage from "./pages/FormLayoutPage";
import FormValidationPage from "./pages/FormValidationPage";
import FormPage from "./pages/FormPage";
import GalleryPage from "./pages/GalleryPage";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import InvoiceAddPage from "./pages/InvoiceAddPage";
import InvoiceEditPage from "./pages/InvoiceEditPage";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoicePreviewPage from "./pages/InvoicePreviewPage";
import KanbanPage from "./pages/KanbanPage";
import LanguagePage from "./pages/LanguagePage";
import LineChartPage from "./pages/LineChartPage";
import ListPage from "./pages/ListPage";
import MarketplaceDetailsPage from "./pages/MarketplaceDetailsPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotificationAlertPage from "./pages/NotificationAlertPage";
import NotificationPage from "./pages/NotificationPage";
import PaginationPage from "./pages/PaginationPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";
import PieChartPage from "./pages/PieChartPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import ProgressPage from "./pages/ProgressPage";
import RadioPage from "./pages/RadioPage";
import RoleAccessPage from "./pages/RoleAccessPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import StarRatingPage from "./pages/StarRatingPage";
import StarredPage from "./pages/StarredPage";
import SwitchPage from "./pages/SwitchPage";
import TableBasicPage from "./pages/TableBasicPage";
import TableDataPage from "./pages/TableDataPage";
import TabsPage from "./pages/TabsPage";
import TagsPage from "./pages/TagsPage";
import TermsConditionPage from "./pages/TermsConditionPage";
import TextGeneratorPage from "./pages/TextGeneratorPage";
import ThemePage from "./pages/ThemePage";
import TooltipPage from "./pages/TooltipPage";
import TypographyPage from "./pages/TypographyPage";
import UsersGridPage from "./pages/UsersGridPage";
import UsersListPage from "./pages/UsersListPage";
import ViewDetailsPage from "./pages/ViewDetailsPage";
import VideoGeneratorPage from "./pages/VideoGeneratorPage";
import VideosPage from "./pages/VideosPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import VoiceGeneratorPage from "./pages/VoiceGeneratorPage";
import WalletPage from "./pages/WalletPage";
import WidgetsPage from "./pages/WidgetsPage";
import WizardPage from "./pages/WizardPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import TextGeneratorNewPage from "./pages/TextGeneratorNewPage";

// added by khurram
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserDetailPage from "./pages/UserDetailPage";
import UserDataPage from "./pages/UserDataPage";
import UserUploadDocument from "./components/UserUploadData";
import AuthWrapper from "./utils/AuthWrapper";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./utils/Layout";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <Layout />
      </AuthWrapper>
    ), // Wrap the dashboard with AuthWrapper
    children: [
      { path: "/", element: <HomePageOne /> },
      {
        path: "/users-detail",
        element: <UserDetailPage />,
      },
      {
        path: "/users-data",
        element: <UserDataPage />,
      },
      {
        path: "/upload-document",
        element: <UserUploadDocument />,
      },
      {
        path: "/index-2",
        element: <HomePageTwo />,
      },
      {
        path: "/index-3",
        element: <HomePageThree />,
      },
      {
        path: "/index-4",
        element: <HomePageFour />,
      },
      {
        path: "/index-5",
        element: <HomePageFive />,
      },
      {
        path: "/index-6",
        element: <HomePageSix />,
      },
      {
        path: "/index-7",
        element: <HomePageSeven />,
      },
      {
        path: "/add-user",
        element: <AddUserPage />,
      },
      {
        path: "/alert",
        element: <AlertPage />,
      },
      {
        path: "/assign-role",
        element: <AssignRolePage />,
      },
      {
        path: "/avatar",
        element: <AvatarPage />,
      },
      {
        path: "/badges",
        element: <BadgesPage />,
      },
      {
        path: "/button",
        element: <ButtonPage />,
      },
      {
        path: "/calendar-main",
        element: <CalendarMainPage />,
      },
      {
        path: "/card",
        element: <CardPage />,
      },
      {
        path: "/carousel",
        element: <CarouselPage />,
      },
      {
        path: "/chat-empty",
        element: <ChatEmptyPage />,
      },
      {
        path: "/chat-message",
        element: <ChatMessagePage />,
      },
      {
        path: "/chat-profile",
        element: <ChatProfilePage />,
      },
      {
        path: "/chat-profile",
        element: <ChatProfilePage />,
      },
      {
        path: "/code-generator",
        element: <CodeGeneratorPage />,
      },
      {
        path: "/users-list",
        element: <UsersListPage />,
      },
      {
        path: "/view-profile",
        element: <ViewProfilePage />,
      },
      {
        path: "/users-grid",
        element: <UsersGridPage />,
      },
      {
        path: "/view-details",
        element: <ViewDetailsPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <StrictMode>
      <RouterProvider router={router}>
        <RouteScrollToTop />
        {/* <App /> */}
        <ToastContainer />
      </RouterProvider>
    </StrictMode>
  </>
);

reportWebVitals();
