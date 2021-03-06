---
description: What is SpaceChop and what does it do?
---

# Introduction

SpaceChop is the best way to do easy image processing. The tool is designed to help you quickly setup a service that fetches original images from your source and process and deliver them accordingly, and can be used with any back-end or front-end. The client is:

## Overview

![](.gitbook/assets/sc-overview%20%282%29.png)

**Paths**  
A path is an URL pattern that will be accepted by SpaceChop. The pattern will consist of a set of parameters that will be extracted from the URL using [path-to-regex](https://github.com/pillarjs/path-to-regexp).

| Path | URL | Parameters |
| :--- | :--- | :--- |
| `/:preset/:image` | `/t_thumb/cat.jpg` | `{ preset: "t_thumb", image: "cat.jpg" }` |

**Parameters**  
The parameters extracted from the URL can be consumed other parts of SpaceChop when fetching, transforming and storing the original image. There is only one parameter that must be set in the path, and that is `preset`, which is used to determine which preset should be used.

**Sources**  
Sources defines how original images can be fetched. One type of source is the _HTTP Source_ which will fetch the original via a standard GET request. We can configure the source like this:

{% code-tabs %}
{% code-tabs-item title="config.yml" %}
```yaml
sources:
  - http:
      root: https://example.com/assets/:image
```
{% endcode-tabs-item %}
{% endcode-tabs %}

You can see here that we used the parameter image to define the path from where original image should be fetched. So if the `image = 'cat.jpg'` the original image would be fetched from `https://example.com/assets/cat.jpg`

**Presets**  
A preset describe the series of operations that will be performed on the original image to create the final image.

A common preset is to create a small thumbnail of the original image to be used as a preview. We can define this preset as this:

{% code-tabs %}
{% code-tabs-item title="config.yml" %}
```yaml
presets:
  steps:
    - $crop:
        width: 200
        height: 200
    - $compress:
        quality: 75
```
{% endcode-tabs-item %}
{% endcode-tabs %}

This will result in a compressed 200x200px image.

**Storage**  
If a storage is defined the final image will be uploaded there after the transformation is completed. Subsequent requests for this image will be fetched from the storage instead of being transformed again.

A storage provider is the _S3 Storage_ which will upload the image to your S3 bucket. The configuration looks like this \(some configuration left out for brevity\):

{% code-tabs %}
{% code-tabs-item title="config.yml" %}
```yaml
storage:
  s3:
    bucket_name: 'my-images'
    path: 'transformed/:preset/:image.:hash'
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Again, we make use of parameters to describe where the transformation should be stored.

