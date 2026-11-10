@api @regression
Feature: Public REST API
  The framework validates an external REST API independently from the UI demo app.

  Scenario: Retrieve an existing post
    When I request public API resource "/posts/1"
    Then the API response status should be 200
    And the API response should contain field "id" with value "1"

  Scenario: Create a post through the public API
    When I create a public API post
    Then the API response status should be 201
    And the API response should contain field "title" with value "Automation API contract check"

  Scenario: Request a missing resource
    When I request public API resource "/posts/999999"
    Then the API response status should be 404
