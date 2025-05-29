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
 * CreateActivityRequest
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class CreateActivityRequest   {
  @JsonProperty("title")

  private String title = null;

  @JsonProperty("description")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String description = null;

  @JsonProperty("startDate")

  private OffsetDateTime startDate = null;

  @JsonProperty("endDate")

  private OffsetDateTime endDate = null;

  @JsonProperty("categoryId")

  private Integer categoryId = null;


  public CreateActivityRequest title(String title) { 

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

  public CreateActivityRequest description(String description) { 

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

  public CreateActivityRequest startDate(OffsetDateTime startDate) { 

    this.startDate = startDate;
    return this;
  }

  /**
   * Get startDate
   * @return startDate
   **/
  
  @Schema(required = true, description = "")
  
@Valid
  @NotNull
  public OffsetDateTime getStartDate() {  
    return startDate;
  }



  public void setStartDate(OffsetDateTime startDate) { 

    this.startDate = startDate;
  }

  public CreateActivityRequest endDate(OffsetDateTime endDate) { 

    this.endDate = endDate;
    return this;
  }

  /**
   * Get endDate
   * @return endDate
   **/
  
  @Schema(required = true, description = "")
  
@Valid
  @NotNull
  public OffsetDateTime getEndDate() {  
    return endDate;
  }



  public void setEndDate(OffsetDateTime endDate) { 

    this.endDate = endDate;
  }

  public CreateActivityRequest categoryId(Integer categoryId) { 

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
    CreateActivityRequest createActivityRequest = (CreateActivityRequest) o;
    return Objects.equals(this.title, createActivityRequest.title) &&
        Objects.equals(this.description, createActivityRequest.description) &&
        Objects.equals(this.startDate, createActivityRequest.startDate) &&
        Objects.equals(this.endDate, createActivityRequest.endDate) &&
        Objects.equals(this.categoryId, createActivityRequest.categoryId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, description, startDate, endDate, categoryId);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CreateActivityRequest {\n");
    
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    startDate: ").append(toIndentedString(startDate)).append("\n");
    sb.append("    endDate: ").append(toIndentedString(endDate)).append("\n");
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
