#![deny(clippy::all)]

use napi::bindgen_prelude::*;
use napi_derive::napi;
use sort_package_json as spj;

/// Options for controlling JSON formatting when sorting
#[napi(object)]
pub struct SortOptions {
  /// Whether to pretty-print the output JSON
  pub pretty: bool,
  /// Whether to sort the scripts field alphabetically
  pub sort_scripts: bool,
}

impl From<SortOptions> for spj::SortOptions {
  fn from(options: SortOptions) -> Self {
    Self {
      pretty: options.pretty,
      sort_scripts: options.sort_scripts,
    }
  }
}

/// Sorts a package.json string with optional custom options
/// If options is not provided, uses default options (pretty-printed)
#[napi]
pub fn sort_package_json(input: String, options: Option<SortOptions>) -> Result<String> {
  (match options {
    Some(opts) => spj::sort_package_json_with_options(&input, &opts.into()),
    None => spj::sort_package_json(&input),
  })
  .map_err(|e| Error::from_reason(e.to_string()))
}
