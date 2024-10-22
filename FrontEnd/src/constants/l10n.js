import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    NAVBAR_HEADING: "Book My Show",
    NAVBAR_NAVITEMS_HOME: "Home",
    NAVBAR_NAVITEMS_LOGOUT: "Logout",
    NAVBAR_NAVITEMS_MY_PROFILE: "My Profile",

    THEATERFORM_HEADING_ADD_THEATER: "Add Theater",
    THEATERFORM_HEADING_EDIT_THEATER: "Edit Theater",
    THEATERFORM_FORM_THEATER_NAME_LABEL: "Theater Name",
    THEATERFORM_FORM_THEATER_NAME_PLACEHOLDER: "Enter the theatre name",
    THEATERFORM_FORM_THEATER_NAME_REQUIRED_MESSAGE: "Theatre name is required!",
    THEATERFORM_FORM_THEATER_ADDRESS_LABEL: "Theatre Address",
    THEATERFORM_FORM_THEATER_ADDRESS_PLACEHOLDER: "Enter the theatre address",
    THEATERFORM_FORM_THEATER_ADDRESS_REQUIRED_MESSAGE:
      "Theater address is required!",
    THEATERFORM_FORM_PHONE_LABEL: "Phone Number",
    THEATERFORM_FORM_PHONE_PLACEHOLDER: "Enter the phone number",
    THEATERFORM_FORM_PHONE_REQUIRED_MESSAGE: "Phone number is required!",
    THEATERFORM_FORM_EMAIL_LABEL: "Email",
    THEATERFORM_FORM_EMAIL_INVALID_MESSAGE: "Invalid email address!",
    THEATERFORM_FORM_EMAIL_REQUIRED_MESSAGE: "Email is required!",
    THEATERFORM_FORM_EMAIL_PLACEHOLDER: "Enter the email",
    THEATERFORM_FORM_SUBMIT_BUTTON: "Submit the data",
    THEATERFORM_FORM_CANCEL_BUTTON: "Cancel",

    THEATERLIST_ADD_THEATER: "Add Theatre",
    THEATERLIST_TABLEHEADING_NAME: "Name",
    THEATERLIST_TABLEHEADING_ADDRESS: "Address",
    THEATERLIST_TABLEHEADING_PHONE: "Phone Number",
    THEATERLIST_TABLEHEADING_EMAIL: "Email",
    THEATERLIST_TABLEHEADING_STATUS: "Status",
    THEATERLIST_STATUS_ACTIVE: "Active",
    THEATERLIST_STATUS_INACTIVE: "InActive",
    THEATERLIST_TABLEHEADING_ACTIONS: "Actions",
    THEATERLIST_ACTION_SHOWS: "Shows",

    THEATERTABLE_ACTION_BLOCK: "Block",
    THEATERTABLE_ACTION_APPROVE: "Approve",

    MOVIEFORM_HEADING_ADD_MOVIE: "Add Movie",
    MOVIEFORM_HEADING_EDIT_MOVIE: "Edit Movie",
    MOVIEFORM_FORM_MOVIE_NAME_LABEL: "Movie Name",
    MOVIEFORM_FORM_MOVIE_NAME_PLACEHOLDER: "Enter the movie name",
    MOVIEFORM_FORM_MOVIE_NAME_REQUIRED_MESSAGE: "Movie name is required!",
    MOVIEFORM_FORM_DESCRIPTION_LABEL: "Description",
    MOVIEFORM_FORM_DESCRIPTION_PLACEHOLDER: "Enter the description",
    MOVIEFORM_FORM_DESCRIPTION_REQUIRED_MESSAGE: "Description is required!",
    MOVIEFORM_FORM_GENRE_LABEL: "Select Movie Genre",
    MOVIEFORM_FORM_GENRE_PLACEHOLDER: "Select Movie Genre",
    MOVIEFORM_FORM_GENRE_REQUIRED_MESSAGE: "Movie genre is required!",
    MOVIEFORM_FORM_LANGUAGE_LABEL: "Select Movie Language",
    MOVIEFORM_FORM_LANGUAGE_PLACEHOLDER: "Select movie language",
    MOVIEFORM_FORM_LANGUAGE_REQUIRED_MESSAGE: "Movie language is required!",
    MOVIEFORM_FORM_MOVIE_DURATION_LABEL: "Movie Duration (in min)",
    MOVIEFORM_FORM_MOVIE_DURATION_PLACEHOLDER: "Enter the movie duration",
    MOVIEFORM_FORM_MOVIE_DURATION_REQUIRED_MESSAGE:
      "Movie duration is required!",
    MOVIEFORM_FORM_POSTER_LABEL: "Poster URL",
    MOVIEFORM_FORM_POSTER_PLACEHOLDER: "Enter the poster URL",
    MOVIEFORM_FORM_POSTER_REQUIRED_MESSAGE: "Movie poster is required!",
    MOVIEFORM_FORM_RELEASE_DATE_LABEL: "Release Date",
    MOVIEFORM_FORM_RELEASE_DATE_REQUIRED_MESSAGE:
      "Movie Release Date is required!",
    MOVIEFORM_FORM_SUBMIT_BUTTON: "Submit the Data",
    MOVIEFORM_FORM_CANCEL_BUTTON: "Cancel",

    MOVIELIST_ADD_MOVIE: "Add Movie",
    MOVIELIST_TABLEHEADING_POSTER: "Poster",
    MOVIELIST_TABLEHEADING_NAME: "Movie Name",
    MOVIELIST_TABLEHEADING_DESCRIPTION: "Description",
    MOVIELIST_TABLEHEADING_RELEASEDATE: "Release Date",
    MOVIELIST_TABLEHEADING_DURATION: "Duration",
    MOVIELIST_TABLEHEADING_GENRE: "Genre",
    MOVIELIST_TABLEHEADING_LANGUAGE: "Language",
    MOVIELIST_TABLEHEADING_ACTIONS: "Actions",

    THEATERFORM_FORM_SUBMIT_BUTTON: "Submit the data",
    THEATERFORM_FORM_CANCEL_BUTTON: "Cancel",

    SHOWFORM_HEADING_ADD_SHOW: "Add Show",
    SHOWFORM_HEADING_EDIT_SHOW: "Edit Show",
    SHOWFORM_FORM_NAME_LABEL: "Show Name",
    SHOWFORM_FORM_NAME_PLACEHOLDER: "Enter the show name",
    SHOWFORM_FORM_NAME_REQUIRED_MESSAGE: "Show name is required!",
    SHOWFORM_FORM_DATE_LABEL: "Show Date",
    SHOWFORM_FORM_DATE_PLACEHOLDER: "Enter the show date",
    SHOWFORM_FORM_DATE_REQUIRED_MESSAGE: "Show date is required!",
    SHOWFORM_FORM_TIME_LABEL: "Show Timing",
    SHOWFORM_FORM_TIME_PLACEHOLDER: "Enter the show time",
    SHOWFORM_FORM_TIME_REQUIRED_MESSAGE: "Show time is required!",
    SHOWFORM_FORM_MOVIE_LABEL: "Select the Movie",
    SHOWFORM_FORM_MOVIE_PLACEHOLDER: "Select the Movie",
    SHOWFORM_FORM_MOVIE_REQUIRED_MESSAGE: "Movie is required!",
    SHOWFORM_FORM_TICKET_PRICE_LABEL: "Ticket Price",
    SHOWFORM_FORM_TICKET_PRICE_PLACEHOLDER: "Enter the ticket price",
    SHOWFORM_FORM_TICKET_PRICE_REQUIRED_MESSAGE: "Ticket price is required!",
    SHOWFORM_FORM_TOTAL_SEATS_LABEL: "Total Seats",
    SHOWFORM_FORM_TOTAL_SEATS_PLACEHOLDER: "Enter the number of total seats",
    SHOWFORM_FORM_TOTAL_SEATS_REQUIRED_MESSAGE: "Total seats is required!",
    SHOWFORM_FORM_SUBMIT_BUTTON: "Submit the data",
    SHOWFORM_FORM_CANCEL_BUTTON: "Cancel",

    SHOWLIST_ADD_SHOW: "Add Show",
    SHOWLIST_TABLEHEADING_NAME: "Show Name",
    SHOWLIST_TABLEHEADING_DATE: "Show Date",
    SHOWLIST_TABLEHEADING_TIME: "Show Time",
    SHOWLIST_TABLEHEADING_MOVIE: "Movie",
    SHOWLIST_TABLEHEADING_TICKET_PRICE: "Total Price",
    SHOWLIST_TABLEHEADING_TOTAL_SEATS: "Total Seats",
    SHOWLIST_TABLEHEADING_AVAILABLE_SEATS: "Available Seats",
    SHOWLIST_TABLEHEADING_ACTIONS: "Actions",

    ADMIN_TABS_MOVIES: "Movies",
    ADMIN_TABS_THEATERS: "Theaters",

    HOME_SEARCH_PLACEHOLDER: "Type here to search for movies",

    FORGOT_PASSWORD_HEADING: "Forgot Password",
    LOGIN_FORM_EMAIL_LABEL: "Email",
    LOGIN_FORM_EMAIL_PLACEHOLDER: "Enter your email",
    LOGIN_FORM_EMAIL_REQUIRED_MESSAGE: "Email is required",
    FORGOT_PASSWORD_SUBMIT_BUTTON: "SEND OTP",
    FORGOT_PASSWORD_GO_TO_LOGIN: "Have you remembered your password?",
    FORGOT_PASSWORD_LOGIN_HERE: "Login here",

    LOGIN_HEADING: "Login to Bookmyshow",
    LOGIN_FORM_EMAIL_LABEL: "Email",
    LOGIN_FORM_EMAIL_PLACEHOLDER: "Enter your email",
    LOGIN_FORM_EMAIL_REQUIRED_MESSAGE: "Email is required",
    LOGIN_FORM_PASSWORD_LABEL: "Password",
    LOGIN_FORM_PASSWORD_PLACEHOLDER: "Enter your password",
    LOGIN_FORM_PASSWORD_REQUIRED_MESSAGE: "Password is required",
    FORGOT_PASSWORD_FORM_SUBMIT_BUTTON: "Generate OTP",
    LOGIN_NEW_USER: "New user ?",
    LOGIN_REGISTER_NOW: "Register Now",
    LOGIN_FORGOT_PASSWORD: "Forgot your password ?",
    LOGIN_RESET_YOUR_PASSWORD: "Reset your password here",

    REGISTER_HEADING: "Register to Bookmyshow",
    REGISTER_FORM_NAME_LABEL: "Name",
    REGISTER_FORM_NAME_REQUIRED_MESSAGE: "Name is required",
    REGISTER_FORM_NAME_PLACEHOLDER: "Enter your name",
    REGISTER_FORM_EMAIL_LABEL: "Email",
    REGISTER_FORM_EMAIL_REQUIRED_MESSAGE: "Email is required",
    REGISTER_FORM_EMAIL_PLACEHOLDER: "Enter your email",
    REGISTER_FORM_PASSWORD_LABEL: "Password",
    REGISTER_FORM_PASSWORD_REQUIRED_MESSAGE: "Password is required",
    REGISTER_FORM_PASSWORD_PLACEHOLDER: "Enter your password",
    REGISTER_FORM_REGISTER_AS_PARTNER_LABEL: "Register as a Partner ?",
    REGISTER_FORM_REGISTER_AS_PARTNER_OPTION_NO: "No",
    REGISTER_FORM_REGISTER_AS_PARTNER_OPTION_YES: "Yes",
    REGISTER_FORM_REGISTER_AS_PARTNER_REQUIRED_MESSAGE:
      "Please select an option!",
    REGISTER_FORM_SUBMIT_BUTTON: "Register",
    REGISTER_ALREADY_A_USER: "Already a user ?",
    REGISTER_LOGIN_NOW: "Login Now",

    RESET_PASSWORD_HEADING: "Reset Password",
    RESET_PASSWORD_FORM_OTP_LABEL: "OTP",
    RESET_PASSWORD_FORM_OTP_PLACEHOLDER: "Enter the OTP",
    RESET_PASSWORD_FORM_OTP_REQUIRED_MESSAGE: "OTP is required",
    RESET_PASSWORD_FORM_NEW_PASSWORD_LABEL: "New Password",
    RESET_PASSWORD_FORM_NEW_PASSWORD_PLACEHOLDER: "Enter the new password",
    RESET_PASSWORD_FORM_NEW_PASSWORD_REQUIRED_MESSAGE:
      "New password is required",
    RESET_PASSWORD_FORM_SUBMIT_BUTTON: "Reset Password",
    RESET_PASSWORD_GENERATE_NEW_OTP: "OTP Expired ?",
    RESET_PASSWORD_GENERATE_OTP_AGAIN: "Generate OTP again here",

    RELOAD: "Reload",
  },
});

export default strings;
