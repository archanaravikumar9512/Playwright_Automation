@smoke @regression
Feature: Product search

  Scenario: User searches for an existing product
    Given I am on the home page
    When I search for "Notebook"
    Then I should see the product "Notebook"

  Scenario: User searches for another existing product
    Given I am on the home page
    When I search for "Keyboard"
    Then I should see the product "Keyboard"
