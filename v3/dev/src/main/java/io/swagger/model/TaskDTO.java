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
 * TaskDTO
 */
@Validated
@NotUndefined
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-05-15T10:20:28.371833724Z[GMT]")


public class TaskDTO   {
  @JsonProperty("id")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Integer id = null;

  @JsonProperty("title")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String title = null;

  @JsonProperty("description")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String description = null;

  @JsonProperty("dueDate")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private OffsetDateTime dueDate = null;

  @JsonProperty("completed")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private Boolean completed = null;

  @JsonProperty("category")

  @JsonInclude(JsonInclude.Include.NON_ABSENT)  // Exclude from JSON if absent
  @JsonSetter(nulls = Nulls.FAIL)    // FAIL setting if the value is null
  private String category = null;


  public TaskDTO id(Integer id) { 

    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
   **/
  
  @Schema(description = "")
  
  public Integer getId() {  
    return id;
  }



  public void setId(Integer id) { 
    this.id = id;
  }

  public TaskDTO title(String title) { 

    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   **/
  
  @Schema(description = "")
  
  public String getTitle() {  
    return title;
  }



  public void setTitle(String title) { 
    this.title = title;
  }

  public TaskDTO description(String description) { 

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

  public TaskDTO dueDate(OffsetDateTime dueDate) { 

    this.dueDate = dueDate;
    return this;
  }

  /**
   * Get dueDate
   * @return dueDate
   **/
  
  @Schema(description = "")
  
@Valid
  public OffsetDateTime getDueDate() {  
    return dueDate;
  }



  public void setDueDate(OffsetDateTime dueDate) { 
    this.dueDate = dueDate;
  }

  public TaskDTO completed(Boolean completed) { 

    this.completed = completed;
    return this;
  }

  /**
   * Get completed
   * @return completed
   **/
  
  @Schema(description = "")
  
  public Boolean isCompleted() {  
    return completed;
  }



  public void setCompleted(Boolean completed) { 
    this.completed = completed;
  }

  public TaskDTO category(String category) { 

    this.category = category;
    return this;
  }

  /**
   * Get category
   * @return category
   **/
  
  @Schema(description = "")
  
  public String getCategory() {  
    return category;
  }



  public void setCategory(String category) { 
    this.category = category;
  }

  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TaskDTO taskDTO = (TaskDTO) o;
    return Objects.equals(this.id, taskDTO.id) &&
        Objects.equals(this.title, taskDTO.title) &&
        Objects.equals(this.description, taskDTO.description) &&
        Objects.equals(this.dueDate, taskDTO.dueDate) &&
        Objects.equals(this.completed, taskDTO.completed) &&
        Objects.equals(this.category, taskDTO.category);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, title, description, dueDate, completed, category);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class TaskDTO {\n");
    
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    dueDate: ").append(toIndentedString(dueDate)).append("\n");
    sb.append("    completed: ").append(toIndentedString(completed)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
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
