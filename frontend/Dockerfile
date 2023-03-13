
# Node version
FROM node:19-alpine as build
ENV NODE_ENV production

RUN apk update
RUN apk add --no-cache libc6-compat yq --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community


# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . /app
RUN yq --inplace --output-format=json '.dependencies = .dependencies * (.devDependencies | to_entries | map(select(.key | test("^(typescript|@types/*|@upleveled/)"))) | from_entries)' package.json


# Install all the dependencies
RUN yarn install --frozen-lockfile


# Generate the build of the application
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
ENV NODE_ENV production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER root

EXPOSE 3000

CMD ["yarn", "start"]
