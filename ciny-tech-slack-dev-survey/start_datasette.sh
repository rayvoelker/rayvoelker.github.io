#!/bin/bash

venv/bin/datasette \
    cincy-tech-survey.db \
    --setting allow_facet on \
    --setting suggest_facets on \
    --setting allow_facet true \
    --metadata=metadata.json \
    --static static:static/ \
    --port 8010
