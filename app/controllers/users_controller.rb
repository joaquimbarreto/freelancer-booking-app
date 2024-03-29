class UsersController < ApiController

    def index
        @users = User.all
        render json: @users      
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user
            render json: @user
        else
            render json: {error: "User not found"}, status: 404
        end
    end

    def new

    end

    def create
        @user = User.create(user_params)
        if @user.save
            render json: @user
        else
            render json: {error: "Unable to create user."}, status: 400
        end   
    end

    def edit
        
    end

    def update
        
    end

    def destroy
        
    end

    def login
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            render json: {user: @user, token: issue_token({id: @user.id})}
        else
            render json: {error: "Username/password combination invalid."}, status: 404
        end
    end

    def validate
        @user = current_user
        if @user
          render json: {user: @user, token: issue_token({id: @user.id})}
        else
          render json: {error: "User not found."}, status: 404
        end
    end

    private

    def user_params
        params.permit(:name, :username, :password, :password_confirmation, :company, :email, :telephone)
    end

end
