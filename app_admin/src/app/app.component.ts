import { Component } from '@angular/core'; // Import the core Angular Component decorator
import { CommonModule } from '@angular/common'; // Import Angular's CommonModule for common directives
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet to enable routing in the application
import { TripListingComponent } from './trip-listing/trip-listing.component'; // Import the TripListingComponent for displaying trips
import { NavbarComponent } from './navbar/navbar.component'; // Import the NavbarComponent for the navigation bar

@Component({
  selector: 'app-root', // Define the selector for the root component (used in HTML as <app-root>)
  standalone: true, // Indicate that this component is a standalone component (doesn't need to be part of a module)
  imports: [CommonModule, RouterOutlet, TripListingComponent, NavbarComponent], // Specify the modules and components to be imported and used in this component
  templateUrl: './app.component.html', // Specify the path to the HTML template for this component
  styleUrl: './app.component.css' // Specify the path to the CSS file for this component's styles
})
export class AppComponent {
  title = 'Travlr Getaways Admin!'; // Define a title property for the component, used in the template
}
