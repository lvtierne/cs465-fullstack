import { Component, OnInit } from '@angular/core'; // Import Angular core Component and OnInit interfaces
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { FormsModule } from "@angular/forms"; // Import FormsModule for handling forms
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthenticationService } from '../services/authentication.service'; // Import AuthenticationService for login functionality
import { NavbarComponent } from '../navbar/navbar.component'; // Import NavbarComponent for displaying the navigation bar
import { User } from '../models/user'; // Import User model (though not used in this component)

// Define the LoginComponent with metadata
@Component({
  selector: 'app-login', // Selector for using this component in HTML as <app-login>
  standalone: true, // Mark this component as standalone (no need for a module)
  imports: [CommonModule, FormsModule, NavbarComponent], // Import dependencies used in this component
  templateUrl: './login.component.html', // Path to the HTML template for this component
  styleUrls: ['./login.component.css'] // Path to the CSS file for this component's styles
})
export class LoginComponent implements OnInit {

  public formError: string = ''; // Property to hold form error messages
  public credentials = { // Object to store user login credentials
    name: '',
    email: '',
    password: '',
  };

  // Constructor to inject dependencies
  constructor(
    private router: Router, // Router for navigation
    private authenticationService: AuthenticationService // Service for authentication
  ) {}

  // Lifecycle hook that gets called after the component is initialized
  ngOnInit() {}

  // Method to handle form submission
  public onLoginSubmit(): void {
    this.formError = ''; // Clear any previous error messages
    // Validate credentials
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again'; // Set error message if validation fails
    } else {
      this.doLogin(); // Call the method to perform login
    }
  }

  // Private method to handle the login process
  private doLogin(): void {
    this.authenticationService
      .login(this.credentials) // Call login method on AuthenticationService
      .then(() => this.router.navigateByUrl('list-trips')) // Navigate to 'list-trips' on successful login
      .catch((message) => (this.formError = message)); // Set error message on login failure
  }
}
