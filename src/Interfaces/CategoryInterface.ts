

// Request for fetching categories
export interface GetCategoryReq {
    page: number; // Current page number
    limit: number; // Number of items per page
    categoryName?: string; // Optional category name for filtering
  }

// Category model for reuse
export interface Category {
  id: number; // Unique identifier for the category
  categoryName: string; // Name of the category
  description: string; // Description of the category
  status: number; // Status of the category (e.g., active/inactive)
}

export interface CategoryList {
    categories: Category[]; // Array of category strings
  }
  
  // Response for fetching categories
  export interface GetCategoryRes {
    content: Category[]; // Array of category objects
    pageable: {
      pageNumber: number; // Current page number
      pageSize: number; // Number of items per page
      sort: {
        empty: boolean; // Whether sorting criteria is empty
        sorted: boolean; // Whether the content is sorted
        unsorted: boolean; // Whether the content is unsorted
      };
      offset: number; // Offset value for pagination
      paged: boolean; // Whether pagination is enabled
      unpaged: boolean; // Whether pagination is disabled
    };
    last: boolean; // Whether this is the last page
    totalElements: number; // Total number of elements
    totalPages: number; // Total number of pages
    size: number; // Number of items per page
    number: number; // Current page index
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean; // Whether this is the first page
    numberOfElements: number; // Number of elements on the current page
    empty: boolean; // Whether the content is empty
  }
  
  // Request for adding a new category
  export interface AddCategoryReq {
    categoryName: string; // Name of the category
    description: string; // Description of the category
    status: number; // Status of the category (e.g., active/inactive)
  }
  
  // Response for adding a new category
  export interface AddCategoryRes {
    success: boolean; // Whether the operation was successful
    message: string; // Response message
  }
  
  // Request for searching categories by name
  export interface SearchCategoryReq {
    categoryName: string; // Name of the category to search for
  }
  
  // Request for deleting a category
  export interface DeleteCategoryReq {
    id: number; // ID of the category to delete
  }
  
  // Response for deleting a category
  export interface DeleteCategoryRes {
    success: boolean; // Whether the operation was successful
    message: string; // Response message
  }
  