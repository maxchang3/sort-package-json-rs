#![deny(clippy::all)]

use napi::bindgen_prelude::*;
use napi_derive::napi;
use sort_package_json as spj;

#[napi(object)]
pub struct SortOptions {
  pub pretty: bool,
  pub sort_scripts: bool,
}

impl From<SortOptions> for spj::SortOptions {
  fn from(options: SortOptions) -> Self {
    spj::SortOptions {
      pretty: options.pretty,
      sort_scripts: options.sort_scripts,
    }
  }
}

#[napi]
pub fn sort_package_json(input: String) -> Result<String> {
  spj::sort_package_json(&input).map_err(|e| Error::from_reason(e.to_string()))
}

#[napi]
pub fn sort_package_json_with_options(input: String, options: SortOptions) -> Result<String> {
  spj::sort_package_json_with_options(&input, &options.into()).map_err(|e| Error::from_reason(e.to_string()))
}
