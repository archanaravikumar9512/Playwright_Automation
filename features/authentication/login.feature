@regression
Feature: Authentication

  Background:
    Given I am on the sign-in page

  @smoke
  Scenario: Valid user signs in
    When I sign in with valid credentials
    Then I should see the welcome page

  Scenario: Invalid password is rejected
    When I sign in with an invalid password
    Then I should see the login error "Invalid email or password"
