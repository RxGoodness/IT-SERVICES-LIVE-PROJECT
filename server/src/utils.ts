
 interface JoiError {
    message: string
    path?: string[]
    type?: string
    context?: Record<string, string>
  }
  
  export const formatError = (errors: JoiError[]) => {
    errors.map((err) => {
      delete err.path
      delete err.context
      delete err.type
    })
  
    return errors
  }

  export interface FinalError {
    original: Object;
    details: JoiError[];
  }