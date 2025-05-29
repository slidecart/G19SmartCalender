package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.threeten.bp.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import org.openapitools.jackson.nullable.JsonNullable;
import io.swagger.configuration.NotUndefined;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * CreateTaskRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class CreateTaskRequest   {
  @JsonProperty("title")

  private String title = null;

  @JsonProperty("description")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String description = null;

  @JsonProperty("dueDate")

  private OffsetDateTime dueDate = null;

  @JsonProperty("categoryId")

  private Integer categoryId = null;


  public CreateTaskRequest title(String title) { 

    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public String getTitle() {  
    return title;
  }



  public void setTitle(String title) { 

    this.title = title;
  }

  public CreateTaskRequest description(String description) { 

    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
   **/
  
  @Schema(description = "")
  
  public String getDescription() {  
    return description;
  }



  public void setDescription(String description) { 
    this.description = description;
  }

  public CreateTaskRequest dueDate(OffsetDateTime dueDate) { 

    this.dueDate = dueDate;
    return this;
  }

  /**
   * Get dueDate
   * @return dueDate
   **/
  
  @Schema(required = true, description = "")
  
@Valid
  @NotNull
  public OffsetDateTime getDueDate() {  
    return dueDate;
  }



  public void setDueDate(OffsetDateTime dueDate) { 

    this.dueDate = dueDate;
  }

  public CreateTaskRequest categoryId(Integer categoryId) { 

    this.categoryId = categoryId;
    return this;
  }

  /**
   * Get categoryId
   * @return categoryId
   **/
  
  @Schema(required = true, description = "")
  
  @NotNull
  public Integer getCategoryId() {  
    return categoryId;
  }



  public void setCategoryId(Integer categoryId) { 

    this.categoryId = categoryId;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreateTaskRequest createTaskRequest = (CreateTaskRequest) o;
    return Objects.equals(this.title, createTaskRequest.title) &&
        Objects.equals(this.description, createTaskRequest.description) &&
        Objects.equals(this.dueDate, createTaskRequest.dueDate) &&
        Objects.equals(this.categoryId, createTaskRequest.categoryId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, description, dueDate, categoryId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateTaskRequest {\n");
    
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    dueDate: ").append(toIndentedString(dueDate)).append("\n");
    sb.append("    categoryId: ").append(toIndentedString(categoryId)).append("\n");
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
