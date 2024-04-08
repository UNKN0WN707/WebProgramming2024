# Use the official Nginx image as a base image
FROM nginx:alpine

# Remove default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Define the command to start Nginx
CMD ["nginx", "-g", "daemon off;"]