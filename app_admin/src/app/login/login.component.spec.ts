import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular
import { LoginComponent } from './login.component'; // Import the LoginComponent to be tested

// Define a test suite for LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent; // Variable to hold the instance of LoginComponent
  let fixture: ComponentFixture<LoginComponent>; // Variable to hold the test fixture for LoginComponent

  // Set up the testing module and create the component instance before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent] // Import the LoginComponent for testing
    })
    .compileComponents(); // Compile the component and its template

    // Create a fixture for the LoginComponent
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance; // Get the component instance from the fixture
    fixture.detectChanges(); // Trigger change detection to initialize the component
  });

  // Test to ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Check that the component instance is truthy (i.e., it exists)
  });
});
