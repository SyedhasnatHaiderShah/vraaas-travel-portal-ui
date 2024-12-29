import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
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
import ValidateUserOtp from "./pages/ValidateUserOtp";
import HotelsPage from "./pages/hotels/HotelsPage";
import UserUploadPage from "./pages/UserUploadPage";
import CreateCountry from "./pages/hotels/CreateCountry";
import CreateCity from "./pages/hotels/CreateCity";
import CreateHotel from "./pages/hotels/CreateHotel";
import HotelAllData from "./pages/hotels/HotelAllData";
import CreateRoomType from "./pages/room-type/CreateRoomType";
import RoomTypeLayer from "./pages/room-type/RoomTypeLayer";
import RoomTableAllData from "./pages/room-type/RoomTableAllData";
import HotelByID from "./pages/hotels/HotelByID";
import RoomByID from "./pages/room-type/RoomByID";
import HotelServicesLayer from "./pages/hotel-services/HotelServicesLayer";
import CreateHotelServices from "./pages/hotel-services/CreateHotelServices";
import GetAllHotelServices from "./pages/hotel-services/GetAllHotelServices";
import RestaurantsLayer from "./pages/restaurants/RestaurantsLayer";
import GetRestaurantsById from "./pages/restaurants/GetRestaurantsById";
import GetAllRestaurantsData from "./pages/restaurants/GetAllRestaurantsData";
import CreateRestaurants from "./pages/restaurants/CreateRestaurants";
import AirportsLayer from "./pages/airports/AirportsLayer";
import GetAllAirports from "./pages/airports/GetAllAirports";
import GetAirportById from "./pages/airports/GetAirportById";
import CreateAirports from "./pages/airports/CreateAirports";
import CreateAirLines from "./pages/airlines/CreateAirLines";
import GetAllAirlines from "./pages/airlines/GetAllAirlines";
import GetAirlinesById from "./pages/airlines/GetAirlinesById";
import ArilinesLayer from "./pages/airlines/ArilinesLayer";
import FlightsLayer from "./pages/flights/FlightsLayer";
import GetAllFlights from "./pages/flights/GetAllFlights";
import GetFlightsById from "./pages/flights/GetFlightsById";
import CreateFlights from "./pages/flights/CreateFlights";
import TransportCompanyLayer from "./pages/transport-company/TransportCompanyLayer";
import GetAllCompanyData from "./pages/transport-company/GetAllCompanyData";
import GetCompanyById from "./pages/transport-company/GetCompanyById";
import CreateCompany from "./pages/transport-company/CreateCompany";
import AllTransportServices from "./pages/transport-services/AllTransportServices";
import TransportServicesByid from "./pages/transport-services/TransportServicesByid";
import CreateTransportServices from "./pages/transport-services/CreateTransportServices";
import TransportServicesLayer from "./pages/transport-services/TransportServicesLayer";
import BookingsLayer from "./pages/bookings/BookingsLayer";
import CreateBookings from "./pages/bookings/CreateBookings";
import GetBookingsById from "./pages/bookings/GetBookingsById";
import GetAllBookingsData from "./pages/bookings/GetAllBookingsData";
import PaymentsLayer from "./pages/payments/PaymentsLayer";
import CreatePayments from "./pages/payments/CreatePayments";
import GetPaymentsById from "./pages/payments/GetPaymentsById";
import GetAllPaymentsData from "./pages/payments/GetAllPaymentsData";

const router = createBrowserRouter([
  { path: "/sign-in", element: <SignInPage /> },
  { path: "/sign-up", element: <SignUpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/change-password", element: <ChangePasswordPage /> },
  { path: "/validate-user-otp", element: <ValidateUserOtp /> },
  { path: "*", element: <ErrorPage /> },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <Layout />
      </AuthWrapper>
    ),
    children: [
      { path: "/", element: <HomePageOne /> },
      { path: "/user-detail", element: <UserDetailPage /> },
      { path: "/user-data", element: <UserDataPage /> },
      { path: "/upload-document", element: <UserUploadPage /> },
      { path: "/index-2", element: <HomePageTwo /> },
      { path: "/index-3", element: <HomePageThree /> },
      { path: "/index-4", element: <HomePageFour /> },
      { path: "/index-5", element: <HomePageFive /> },
      { path: "/index-6", element: <HomePageSix /> },
      { path: "/index-7", element: <HomePageSeven /> },
      { path: "/add-user", element: <AddUserPage /> },
      { path: "/alert", element: <AlertPage /> },
      { path: "/assign-role", element: <AssignRolePage /> },
      { path: "/avatar", element: <AvatarPage /> },
      { path: "/badges", element: <BadgesPage /> },
      { path: "/button", element: <ButtonPage /> },
      { path: "/calendar-main", element: <CalendarMainPage /> },
      { path: "/card", element: <CardPage /> },
      { path: "/carousel", element: <CarouselPage /> },
      { path: "/chat-empty", element: <ChatEmptyPage /> },
      { path: "/chat-message", element: <ChatMessagePage /> },
      { path: "/chat-profile", element: <ChatProfilePage /> },
      { path: "/code-generator", element: <CodeGeneratorPage /> },
      { path: "/users-list", element: <UsersListPage /> },
      { path: "/view-profile", element: <ViewProfilePage /> },
      { path: "/users-grid", element: <UsersGridPage /> },
      { path: "/view-details", element: <ViewDetailsPage /> },
      { path: "/code-generator-new", element: <CodeGeneratorNewPage /> },
      { path: "/colors", element: <ColorsPage /> },
      { path: "/column-chart", element: <ColumnChartPage /> },
      { path: "/company", element: <CompanyPage /> },
      { path: "/currencies", element: <CurrenciesPage /> },
      { path: "/dropdown", element: <DropdownPage /> },
      { path: "/email", element: <EmailPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/form-layout", element: <FormLayoutPage /> },
      { path: "/form-validation", element: <FormValidationPage /> },
      { path: "/form", element: <FormPage /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/image-generator", element: <ImageGeneratorPage /> },
      { path: "/image-upload", element: <ImageUploadPage /> },
      { path: "/invoice-add", element: <InvoiceAddPage /> },
      { path: "/invoice-edit", element: <InvoiceEditPage /> },
      { path: "/invoice-list", element: <InvoiceListPage /> },
      { path: "/invoice-preview", element: <InvoicePreviewPage /> },
      { path: "/kanban", element: <KanbanPage /> },
      { path: "/language", element: <LanguagePage /> },
      { path: "/line-chart", element: <LineChartPage /> },
      { path: "/list", element: <ListPage /> },
      { path: "/marketplace-details", element: <MarketplaceDetailsPage /> },
      { path: "/marketplace", element: <MarketplacePage /> },
      { path: "/notification-alert", element: <NotificationAlertPage /> },
      { path: "/notification", element: <NotificationPage /> },
      { path: "/pagination", element: <PaginationPage /> },
      { path: "/payment-gateway", element: <PaymentGatewayPage /> },
      { path: "/pie-chart", element: <PieChartPage /> },
      { path: "/portfolio", element: <PortfolioPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/progress", element: <ProgressPage /> },
      { path: "/radio", element: <RadioPage /> },
      { path: "/role-access", element: <RoleAccessPage /> },
      { path: "/star-rating", element: <StarRatingPage /> },
      { path: "/starred", element: <StarredPage /> },
      { path: "/switch", element: <SwitchPage /> },
      { path: "/table-basic", element: <TableBasicPage /> },
      { path: "/table-data", element: <TableDataPage /> },
      { path: "/tabs", element: <TabsPage /> },
      { path: "/tags", element: <TagsPage /> },
      { path: "/terms-condition", element: <TermsConditionPage /> },
      { path: "/text-generator-new", element: <TextGeneratorNewPage /> },
      { path: "/text-generator", element: <TextGeneratorPage /> },
      { path: "/theme", element: <ThemePage /> },
      { path: "/tooltip", element: <TooltipPage /> },
      { path: "/typography", element: <TypographyPage /> },
      { path: "/video-generator", element: <VideoGeneratorPage /> },
      { path: "/videos", element: <VideosPage /> },
      { path: "/voice-generator", element: <VoiceGeneratorPage /> },
      { path: "/wallet", element: <WalletPage /> },
      { path: "/widgets", element: <WidgetsPage /> },
      { path: "/wizard", element: <WizardPage /> },
      // hotels
      { path: "/hotels", element: <HotelsPage /> },
      { path: "/create-country", element: <CreateCountry /> },
      { path: "/create-city", element: <CreateCity /> },
      { path: "/create-hotel", element: <CreateHotel /> },
      { path: "/hotel-all-data", element: <HotelAllData /> },
      { path: "/hotel-id", element: <HotelByID /> },
      // room type
      { path: "/room-type", element: <RoomTypeLayer /> },
      { path: "/create-room-type", element: <CreateRoomType /> },
      { path: "/room-type-all", element: <RoomTableAllData /> },
      { path: "/room-by-id", element: <RoomByID /> },
      // hotel services
      { path: "/hotel-services-layer", element: <HotelServicesLayer /> },
      { path: "/create-hotel-services", element: <CreateHotelServices /> },
      { path: "/all-hotel-services", element: <GetAllHotelServices /> },
      // restaurants
      { path: "/restaurants-layer", element: <RestaurantsLayer /> },
      { path: "/create-restaurants", element: <CreateRestaurants /> },
      { path: "/get-restaurants-id", element: <GetRestaurantsById /> },
      { path: "/get-all-restaurants", element: <GetAllRestaurantsData /> },
      // airports
      { path: "/airports-layer", element: <AirportsLayer /> },
      { path: "/get-all-airports", element: <GetAllAirports /> },
      { path: "/airport-by-id", element: <GetAirportById /> },
      { path: "/create-airports", element: <CreateAirports /> },
      // airlines
      { path: "/airlines-layer", element: <ArilinesLayer /> },
      { path: "/get-all-airlines", element: <GetAllAirlines /> },
      { path: "/airlines-by-id", element: <GetAirlinesById /> },
      { path: "/create-airlines", element: <CreateAirLines /> },
      // flights
      { path: "/flights-layer", element: <FlightsLayer /> },
      { path: "/get-all-flights", element: <GetAllFlights /> },
      { path: "/flights-by-id", element: <GetFlightsById /> },
      { path: "/create-flight", element: <CreateFlights /> },
      // transport companies
      { path: "/transport-company-layer", element: <TransportCompanyLayer /> },
      { path: "/all-transport-companies", element: <GetAllCompanyData /> },
      { path: "/transport-companies-by-id", element: <GetCompanyById /> },
      { path: "/create-transport-company", element: <CreateCompany /> },
      // transport services
      {
        path: "/transport-services-layer",
        element: <TransportServicesLayer />,
      },
      { path: "/transport-services", element: <AllTransportServices /> },
      { path: "/transport-services-by-id", element: <TransportServicesByid /> },
      {
        path: "/create-transport-services",
        element: <CreateTransportServices />,
      },
      // bookings
      { path: "/bookings-layer", element: <BookingsLayer /> },
      { path: "/create-bookings", element: <CreateBookings /> },
      { path: "/get-bookings-id", element: <GetBookingsById /> },
      { path: "/get-all-bookings", element: <GetAllBookingsData /> },
      // payments
      { path: "/payments-layer", element: <PaymentsLayer /> },
      { path: "/create-payments", element: <CreatePayments /> },
      { path: "/get-payments-id", element: <GetPaymentsById /> },
      { path: "/get-all-payments", element: <GetAllPaymentsData /> },
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
      </RouterProvider>
      <ToastContainer />
    </StrictMode>
  </>
);

reportWebVitals();
