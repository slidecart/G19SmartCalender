package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import org.openapitools.jackson.nullable.JsonNullable;
import io.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * CreateCategoryRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class CreateCategoryRequest   {
  @JsonProperty("name")

  private String name = null;

  @JsonProperty("color")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String color = null;


  public CreateCategoryRequest name(String name) { 

    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getName() {  
    return name;
  }



  public void setName(String name) { 

    this.name = name;
  }

  public CreateCategoryRequest color(String color) { 

    this.color = color;
    return this;
  }

  /**
   * Get color
   * @return color
   **/
  
  @Schema(description = "")
  
  public String getColor() {  
    return color;
  }



  public void setColor(String color) { 
    this.color = color;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateCategoryRequest createCategoryRequest = (CreateCategoryRequest) o;
    return Objects.equals(this.name, createCategoryRequest.name) &&
        Objects.equals(this.color, createCategoryRequest.color);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, color);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateCategoryRequest {\n");
    
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    color: ").append(toIndentedString(color)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
