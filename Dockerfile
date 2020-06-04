# Get the nginx stable alpine image from Docker Hub
FROM nginx:stable-alpine

# Remove default.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx.conf to the conf.d directory
COPY nginx.conf /etc/nginx/conf.d

# Copy the /build folder into the current work directory
COPY /build /usr/share/nginx/html

# Execute nginx command
# '-g daemon off;' will ensure NGINX stays at the foreground for Docker to track properly
ENTRYPOINT ["nginx", "-g", "daemon off;"]